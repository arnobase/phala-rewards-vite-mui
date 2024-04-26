//const QUERY_URL = "https://squid.subsquid.io/khala-computation/graphql"
const QUERY_URL = "https://subsquid.phala.network/khala-computation/graphql"
export const fetchStakeData = async (
    address
) => {
    
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("Connection", "keep-alive");

    const query = JSON.stringify({
        "query": "query MyQuery {\n  accounts(where: {id_eq: \""+address+"\"}) {\n    id\n    stakePoolValue\n    vaultValue\n  }\n}\n",
        "variables": null,
        "operationName": "MyQuery"
    });

    //console.log(query)

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: query,
    redirect: 'follow'
    };

    return await fetch(QUERY_URL, requestOptions)
    .then(response => response.text())
    .then(result => {return result})
    .catch(error => console.log('error', error));     

}