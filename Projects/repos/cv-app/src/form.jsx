import { useState } from "react";
import './styles.css'

function GenInfo()
{

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        school: "",
        degree: "",
        gradDate: "",
        employ: "",
        position: "",
        responsibilities: "",
        empStart: "",
        empEnd: ""
    })

    const [submittedData, setSubmittedData] = useState(null);
    const [isEditing, setIsEditing] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setIsEditing(false);

        if (!isEditing)
        {
            setSubmittedData(formData);
            setFormData({        
                name: "",
                email: "",
                phone: "",
                school: "",
                degree: "",
                gradDate: "",
                employ: "",
                position: "",
                responsibilities: "",
                empStart: "",
                empEnd: ""
            })
        }
    }

    const handleEdit = () => {
        setFormData(submittedData);
        setIsEditing(true);
    }

    return (
        <>
            <div className="form-container">
                <form className="main-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Enter your full name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    <label htmlFor="email"> Enter Your email: </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    <label>Enter your phone number: </label>
                        <input
                            type="phone"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                    <label>Enter your full school name: </label>
                    <input
                        type="text"
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        required
                    />
                    <label> Enter your degree title: </label>
                        <input
                            type="text"
                            id="degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            required
                        />
                    <label>Enter the date of graduation: </label>
                        <input
                            type="date"
                            id="gradDate"
                            name="gradDate"
                            value={formData.gradDate}
                            onChange={handleChange}
                            required
                        />

                    <label>Enter your past place of employment: </label>
                        <input
                            type="text"
                            id="employ"
                            name="employ"
                            value={formData.employ}
                            onChange={handleChange}
                            required
                        />
                    <label> Enter your position title: </label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        />
                    <label>Enter your responsibilities: </label>
                    <textarea
                            type="text"
                            id="responsibilities"
                            name="responsibilities"
                            value={formData.responsibilities}
                            onChange={handleChange}
                            required
                            rows="5"
                            cols="20"
                    />
                    <label> Enter starting date of your employment: </label>
                        <input
                            type="date"
                            id="empStart"
                            name="empStart"
                            value={formData.empStart}
                            onChange={handleChange}
                            required
                        />
                    <label> Enter end date of your employment: </label>
                        <input
                            type="date"
                            id="empEnd"
                            name="empEnd"
                            value={formData.empEnd}
                            onChange={handleChange}
                            required
                        />

                    <input type="submit"  value={isEditing ? "Update" : "Submit"}/>
                </form>
            </div>
            {submittedData && (
                <div className="showData">
                    <h2>Submitted Data: </h2>
                    <p><strong>Name: </strong> {submittedData?.name}</p>
                    <p><strong>Email: </strong> {submittedData?.email}</p>
                    <p><strong>Phone: </strong> {submittedData?.phone}</p>
                    <p><strong>School: </strong> {submittedData?.school}</p>
                    <p><strong>Degree: </strong> {submittedData?.degree}</p>
                    <p><strong>Graduation Date: </strong> {submittedData?.gradDate}</p>
                    <p><strong>Current Employment: </strong> {submittedData?.employ}</p>
                    <p><strong>Position: </strong> {submittedData?.position}</p>
                    <p><strong>Responsibilities: </strong> {submittedData?.responsibilities}</p>
                    <p><strong>Employment Start Date: </strong> {submittedData?.empStart}</p>
                    <p><strong>Employment End Date: </strong> {submittedData?.empEnd}</p>
                    <button onClick={handleEdit}>Edit Data</button>
                </div>
            )}
            
        </>
        
    )
}


export default GenInfo;