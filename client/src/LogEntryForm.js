import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { createLogEntry } from "./API";

const LogEntryForm = ({ locationData, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {register, handleSubmit } = useForm();

    const onSubmitForm = (data) => {
        try {
            setLoading(true);
            data.latitude = locationData.latitude;
            data.longitude = locationData.longitude;
            createLogEntry(data);
            onClose();
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmitForm)} className="entry-form">
            { error ? <h3 className="error">{ error }</h3> : null }
            <label htmlFor="title">Title</label>
            <input name="title" required ref={register}/>
            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={3} ref={register}/>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3} ref={register}/>
            <label htmlFor="image">Image</label>
            <input name="image" ref={register} />
            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" required ref={register}/>
            <label htmlFor="rating">Rank</label>
            <input name="rating" type="number" ref={register}/>
            <button disabled={ loading }>
                {loading ? 'Loading...' : 'Registry Entry'}
            </button>
        </form>
    );
};

export default LogEntryForm;
