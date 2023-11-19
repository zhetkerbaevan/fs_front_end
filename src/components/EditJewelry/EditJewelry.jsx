import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Service from "../../services/Service";

const EditJewelry = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('');

    const [categoryList, setCategoryList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');

    const [categoryListInit, setCategoryListInit] = useState([]);


    useEffect(() => {
        const fetchJewelry = async () => {
            try {
                const res = await Service.getJewelry(id);
                const jewelry = res.data;
                setName(jewelry.name);
                setPrice(jewelry.price);
                setDescription(jewelry.description);
                setPhoto(jewelry.photo);
                setCategory(jewelry.category.type);

                const resp = await Service.getCategory();
                const categoryListInit = resp.data;
                setCategoryListInit(categoryListInit)
                const categoryList = resp.data;
                categoryList.sort((a, b) => {
                    if (a.type === category) return -1;
                    if (b.type === category) return 1;
                    return 0;
                });
                setCategoryList(categoryList);
            } catch (error) {
                console.log("Failed to fetch jewelry:", error.message);
            }
        };

        fetchJewelry();
    }, [id, category]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'photo':
                setPhoto(value);
                break;
            case 'category':
                setSelectedCategory(value);
                break;

            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedCategoryFromAPI = categoryListInit.find((item) => item.type === selectedCategory);
        const selectedCategory_id = selectedCategoryFromAPI ? selectedCategoryFromAPI.id : 0;

        console.log("category_id: ", selectedCategory);

        const updatedCategory = {
            id : {id: id},
            name,
            price,
            description,
            category_id: selectedCategory_id
        };

        console.log(updatedCategory)
        try {
            const res = await Service.updateJewelry(id, updatedCategory);
            console.log("Jewelry updated successfully:", res.data);
            navigate("/jewelries");
        } catch (error) {
            console.log("Failed to update jewelry:", error.message);
        }
    };

    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Edit {name}</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Price:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="price"
                                        value={price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Link to picture:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="photo"
                                        value={photo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Category:</label>
                                    <select
                                        name="category"
                                        value={selectedCategory}
                                        onChange={handleChange}
                                    >
                                        {categoryList.map((category) => (
                                            <option key={category.type} value={category.type}>
                                                {category.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
</div>
    );
};

export default EditJewelry;