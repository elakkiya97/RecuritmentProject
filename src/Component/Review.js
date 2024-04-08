import React from "react"

const Review = ({ isAcknowledgmentSubmitted }) => {
    return (
        <div className="review-container">
            {isAcknowledgmentSubmitted && (
                <div className="success-message">
                    <div className="success-icon">✔</div>
                    <div className="success-text">
                        <p>Congratulations!</p>
                        <p>You have successfully applied!</p>
                    </div>
                </div>
            )}
            {/* Other review content */}
        </div>
    )
}

export default Review
