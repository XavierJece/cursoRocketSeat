import React, {Component} from 'react';
import TechItem from './TechItem';

class TechList extends Component {
    state = {
        newTech: '',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native'
        ]
    }

    handleInputChange = e => {
        this.setState({
            newTech: e.target.value
        });
    }

    handleSubmit = e =>{
        e.preventDefault();

        if(this.state.newTech.trim() !== ''){
            this.setState({
                techs: [... this.state.techs, this.state.newTech],
                newTech: '',
            });
        }
    }

    onDelete = (tech) => {
        this.setState({
            techs: this.state.techs.filter(t => t !== tech)
        });
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.state.techs.map(tech => (
                        <TechItem 
                            key={tech} 
                            tech={tech}
                            onDelete={() => this.onDelete(tech)}
                        />
                    ))}
                </ul>
                <input 
                    type="text"
                    onChange={this.handleInputChange}
                    value= {this.state.newTech}

                />
                <button type="submit">Adicionar Tech</button>
            </form>
        );
    }
}

export default TechList;