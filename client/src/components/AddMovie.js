import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovie = (props) => {

    const { setMovies, movies } = props;
    const { push } = useHistory();

    const [newMovie, setNewMovie] = useState({
        title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: "",
        id: Math.random()
    });


    const handleChange = (e) => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', newMovie)
            .then(resp => {
                setMovies([
                    ...movies, newMovie
                ]);
                push('/movies');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Add new movie!</h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input onChange={handleChange} name="title" type="text" value={newMovie.title} className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input onChange={handleChange} name="director" type="text" value={newMovie.director} className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input onChange={handleChange} name="genre" type="text" value={newMovie.genre} className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input onChange={handleChange} name="metascore" type="number" value={newMovie.metascore} className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea onChange={handleChange} name="description" value={newMovie.description} className="form-control"></textarea>
					</div>		
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="submit"/>
				</div>
			</form>
		</div>
	</div>);
}

export default AddMovie;