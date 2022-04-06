import axios from 'axios'

interface IRequest {
    address: string;
    keyGoogle: string;
}

interface IResponse {
    minDistance: string[];
    maxDistance: string[];
    allComparation: string[];
}

class EuclideaProculService {

    /**
     * Classe principal do Service, contem parte principal da regra de negócio
     * @param address Uma string com os endereços 
     * @param keyGoogle Uma chave de acesso para o Google Maps
     * @returns Um Json com as distancias dos endereços, os endereços mais proximos e os mais distantes
     */
    public async execute({
        address,
        keyGoogle,
    }: IRequest): Promise<IResponse> {
        console.log(address)

        // URL base da API do Google Maps
        const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

        // Monta a URL que será enviada ao Google Maps
        const url = `${baseUrl}${address}&key=${keyGoogle}`

        // Faz a requisição ao Google Maps
        const response = await axios.get(url)

        // Pega os endereços a partir da resposta da API
        const coordinantes = response.data.results.map((coordinante) => {
            const data = {
                address: coordinante.formatted_address,
                lat: coordinante.geometry.location.lat,
                lng: coordinante.geometry.location.lng
            }
            return data
        })

        const result: IResponse = {
            allComparation: this.getCalc(coordinantes)[0],
            minDistance: this.getCalc(coordinantes)[1],
            maxDistance: this.getCalc(coordinantes)[2],
        }

        return result
    }

    /**
     * Metodo Privado que faz o calculo Euclidiano
     * @param coordinantes Array de objetos com os endereços e as coordenadas
     * @returns Array de objetos com todas as distacancias de endereços, os endereços mais proximos e os mais distantes
     */
    private getCalc(coordinantes) {

        let _MINDISTANCE = 1000
        let _MAXDISTANCE = 0
        var clone = []
        // Array que irá conter os endereços mais proximos
        var minDistance = [
            { firstAddress: '', secondAddress: '', distance: 0 }
        ]
        // Array que irá conter os endereços mais distantes
        var maxDistance = [
            { firstAddress: '', secondAddress: '', distance: 0 }
        ]

        coordinantes.map((element, indice) => {
            coordinantes.forEach((element2, id) => {

                if (indice > id) {
                    // Formulado calculo Euclidiano
                    const lat = (element2.lat - element.lat)
                    const lng = (element2.lng - element.lng)
                    const xy = Math.sqrt(Math.pow(lat, 2) + Math.pow(lng, 2))

                    // Verifica se a distancia é menor que a menor distancia atual
                    if (_MAXDISTANCE < xy) {
                        maxDistance = [{
                            firstAddress: element.address,
                            secondAddress: element2.address,
                            distance: xy,
                        }]
                        _MAXDISTANCE = xy
                    }

                    // Verifica se a distancia é maior que a maior distancia atual
                    if (_MINDISTANCE > xy && xy > 0) {
                        minDistance = [{
                            firstAddress: element.address,
                            secondAddress: element2.address,
                            distance: xy,
                        }]
                        _MINDISTANCE = xy
                    }
                    // Guarda os endereços e suas respectivas distancias
                    const data = {
                        firstAddress: element.address,
                        secondAddress: element2.address,
                        distance: xy,
                    }

                    // Adiciona as dados no array de retorno
                    clone = [...clone, data]
                }
            });

        });
        return [clone, minDistance, maxDistance]
    }
}

export default EuclideaProculService

