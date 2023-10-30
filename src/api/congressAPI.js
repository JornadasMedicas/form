import axios from "axios";

export const fetchModules = async () => {
    try {
        const response = await axios.get("http://localhost:5000/modulo");
        return response.data
    } catch (error) {
        console.log(error);
    }
}