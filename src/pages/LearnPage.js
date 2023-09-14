import RunsAccordian from "../components/Learn/RunsAccordian";
import './LearnPage.css'

function LearnPage() {

    return (
        <div>
            <div className="learn-page-main-content">
                <div className="learn-container">
                    <h1>types of session</h1>
                    <RunsAccordian />
                </div>
            </div >
        </div>
    );
}

export default LearnPage;