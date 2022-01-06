import Axios from 'axios'

const token = 'MDRmMTE2NTAtYTllNS00ZmIwLWIxMTYtNTBhOWU1MmZiMGFiOkhxS1ZhRVE4SEMzcFZQNTIxOFc1WENoNUhDR3ZrSnZ4cHZLeGI0SWJLVTg='
const apiKey = '67767088-88e2-4416-9d2d-d784edc20b3c'

// const getTokenCedula = async () => {
//     const response = await fetch('https://api.am.digital.gob.do/digital/oauth/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + token
//         },
//         body: 'grant_type=client_credentials'
//     })

//     const data = await response.json()

//     return data.access_token
// }

export const getInfoCedula = async (cedulaId) => await Axios.get(`https://api.digital.gob.do/valpha/citizens/${cedulaId}/info/basic?api-key=${apiKey}`)