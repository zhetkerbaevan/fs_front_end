import React, {useEffect, useState} from 'react';
import Service from "../../services/Service";

const SearchFilter = () => {
    const [jewelries, setJewelries] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search)
    useEffect(() => {
        const fetchJewelries = async () => {
            try {
                const res = await Service.getJewelries();
                const jewelries = res.data;
                setJewelries(jewelries);
            } catch (error) {
                console.log("Failed to fetch jewelries:", error.message);
            }
        };

        fetchJewelries();
    }, []);

    return (
        <div>
            <h2 className="text-center">Jewelry</h2>
            <form>
                <input type="text" onChange={(e)=> setSearch(e.target.value)} placeholder='Search'/>
            </form>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    jewelries.filter((jewelry) => {
                        const searchTerm = search.toLowerCase();
                        return (
                            searchTerm === '' ||
                            jewelry.name.toLowerCase().includes(searchTerm) ||
                            jewelry.description.toLowerCase().includes(searchTerm) ||
                            jewelry.photo.toLowerCase().includes(searchTerm) ||
                            jewelry.category.type.toLowerCase().includes(searchTerm)
                        );
                    }).map(
                        jewelry =>
                            <tr key = {jewelry.id}>
                                <td> {jewelry.name}</td>
                                <td> {jewelry.price}</td>
                                <td> {jewelry.description}</td>
                                <td> {jewelry.photo}</td>
                                <td> {jewelry.category.type}</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default SearchFilter;