import React from 'react'

export class ReviewForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.review
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        // this.handleRemove = this.handleRemove.bind(this);
        this.update = this.update.bind(this);
    }

    update(field) {
        return (e) => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const review = this.state
        this.props.action({review: review})
            .then(() =>
                this.props.history.push(`/products/${this.state.product_id}`),
                (err) => {
                    console.log(err)
            })
    }


    // renderErrors() {
    //     let errors = []
    //     errors = this.props.review.errors
    //     if (errors) {
    //         return (
    //             <ul className="errors-ul">
    //                 {this.props.review.errors.map((error, i) => (
    //                     <li key={`error-${i}`} className="error">
    //                         {error}
    //                     </li>
    //                 ))}
    //             </ul>
    //         );
    //     }
    // }

    // renderRemoveReviewButton() {
    //     return (
    //         <div>
    //             <button
    //                 onClick={this.handleRemove}>
    //                 Remove review
    //             </button>
    //         </div>
    //     )
    // }

    // handleRemove() {
    //     this.props.removeReview(this.state.id)
    // }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}>
                    <label>Title
                        <br/>
                        <input 
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}/>
                    </label>

                    <label>Body
                        <br />
                        <input
                            type="text"
                            value={this.state.body}
                            onChange={this.update('body')} />
                    </label>

                    <label>Rating
                        <br />
                        <input
                            type="number"
                            value={this.state.rating}
                            onChange={this.update('rating')}/>
                    </label>

                    <input
                        type="submit"
                        value={this.props.formType} />
                </form>
            </div>
        )
    }
}