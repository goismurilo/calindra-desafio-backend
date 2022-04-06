import axios from 'axios'

interface IRequest {
    address: string;
}

class EuclideaProculService {
    public async execute(): Promise<string> {

        const address = 'Av. Rio branco 1 - Centro, Rio de Janeiro - RJ+Rua 19 de fevereiro, 34 - Botafogo, Rio de Janeiro - RJ+Rua Uruguaiana 22, Centro'

        const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
        const googleKey = ''

        const url = `${baseUrl}${address}&key=${googleKey}`

        console.log(url)
        const response = await axios.get(url)


        const coordinantes = response.data.results.map((coordinante) => {
            const data = {
                address: coordinante.formatted_address,
                lat: coordinante.geometry.location.lat,
                lng: coordinante.geometry.location.lng
            }
            return data
        })



        return 'euclideaProcul'
    }
}

export default EuclideaProculService