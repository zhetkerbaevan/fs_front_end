import Service from "../../../services/Service";

export const FETCH_JEWELRIES_SUCCESS = 'FETCH_JEWELRIES_SUCCESS';

export const fetchJewelriesSuccess = (jewelries) => {
    return {
        type: FETCH_JEWELRIES_SUCCESS,
        payload: jewelries,
    };
};

export const fetchJewelries = () => {
    return (dispatch) => {
        Service.getJewelries()
            .then((res) => {
                const jewelries = res.data;
                dispatch(fetchJewelriesSuccess(jewelries));
            })
            .catch((error) => {
                console.log('Error while fetching jewelries:', error);
            });
    };
};
