const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const {generateVanityNumbers,selectBestVanityNumbers} = require('./processVanityNumbers')


module.exports.handler = async (event) => {
    try{
    console.log("event", event)
    const body = JSON.parse(event.body)
    const PhoneNumber = body.PhoneNumber.toString();
    const inputparams = {
        TableName: process.env.TableName,
        KeyConditionExpression: '#pk = :PhoneNumber',
      ExpressionAttributeNames: {
          '#pk': 'PhoneNumber'
      },
      ExpressionAttributeValues: {
          ':PhoneNumber': PhoneNumber
      },Key: {
          pk: PhoneNumber
      }
    };
    const getddbResponse = await dynamo.query(inputparams).promise()
    console.log('getddbResponse : ',getddbResponse)
    if(getddbResponse.Items.lenth >0){
        return {
            statusCode: 200,
            body: JSON.stringify(getddbResponse.Items[0].VanityNumbers)
        };
    } 
    const vanityNumbers = generateVanityNumbers(PhoneNumber);
    const bestVanityNumbers = selectBestVanityNumbers(vanityNumbers);

    const params = {
        TableName: process.env.TableName,
        Item: {
            PhoneNumber: PhoneNumber,
            VanityNumbers: bestVanityNumbers,
            Timestamp: new Date().toISOString()
        }
    };

    await dynamo.put(params).promise();
    console.log("best Vanity Numbers", bestVanityNumbers)
    return {
        statusCode: 200,
        body: JSON.stringify(bestVanityNumbers)
    };
}catch(e){
    console.log("error occured",e)
}
};