import {Component} from "react";


class AppTodo extends Component{
    constructor(props) {
        super(props);
        this.state={
            list: [],
            item: ""
        }
    }
    handleChange = (event) => {
        this.setState({ item: event.target.value });
    };

    handleAddItem = () => {
        const { item, list } = this.state;
        if (item.trim() !== "") {
            this.setState({
                list: [...list, item],
                item: ""
            });
        }
    };
    render() {
        return(
            <>
                <h1>Todo List</h1>
                <div>
                    <input
                        value={this.state.item}
                        onChange={(this.handleChange)}
                        placeholder={'Enter todo to add'}
                    />
                    <button onClick={this.handleAddItem}>Add</button>
                    <ul>
                        {this.state.list.map((t, i) => (
                            <li key={i}>
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>

            </>
        )
    }
}

export default AppTodo ;