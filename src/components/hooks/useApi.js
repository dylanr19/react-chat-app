import axios from 'axios';

export const useApi = () => {

    const callApi = async (url, options) => {
        let response;

        try {
            response = await axios(url, options)
        } catch (error) {
            if (error.response != null)
                response = error.response
        }

        return response
    }

    return { callApi }
}