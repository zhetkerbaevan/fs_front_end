import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
const AddJewelry = () => {
    const [name, nameChange] = useState("");
    const [price, priceChange] = useState("");
    const [description, descriptionChange] = useState("");
    const [photo, photoChange] = useState("");
    const [category_id, categoryChange] = useState("",0);

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        let data = {
            name,
            price,
            description,
            photo,
            category_id,
        };

        try {
            const response = await fetch("http://localhost:8000/api/addJewelry", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Added successfully.");
                navigate("/jewelries");
            } else {
                throw new Error("Failed to add.");
            }
        } catch (err) {
            console.log("Failed: " + err.message);
        }
    };
    return(
            <div>
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card">
                            <div className="card-header">
                            <h3 className="text-center">Add Jewelry</h3>
                            </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Name </label>
                                                <input value={name} onChange={e => nameChange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Price </label>
                                                <input value={price} onChange={e => priceChange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Description </label>
                                                <input value={description} onChange={e => descriptionChange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Link to picture </label>
                                                <input value={photo} onChange={e => photoChange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <br></br>
                                            <label>Bracelet</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={category_id === 'bracelet'} onChange={e => categoryChange(1)}
                                                   name="category" value="bracelet" id="flexRadioDefault1"></input>
                                            <label>Earring</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={category_id === 'earring'} onChange={e => categoryChange(2)}
                                                   name="category" value="earring" id="flexRadioDefault2"></input>
                                            <label>Ring</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={category_id === 'ring'} onChange={e => categoryChange(3)}
                                                   name="category" value="ring" id="flexRadioDefault3"></input>
                                            <label>Necklace</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={category_id === 'necklace'} onChange={e => categoryChange(4)}
                                                   name="category" value="necklace" id="flexRadioDefault3"></input>
                                        </div>
                                    </div>

                                </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Add</button>
                                <button className="btn btn-danger"><Link to={'/'}></Link>Close</button>
                            </div>
                    </div>
                    </form>
                </div>
            </div>
    );
}

export default AddJewelry;
