import "./Score.css";

type ScoreProps = {
    names: [ string, string ],
    scores: [ number, number ]
}

function Score(props: ScoreProps) {
    return (
        <div className="Scoreboard">
            <div className="p0">
                {props.names[0]}<br></br>
                {props.scores[0]}
            </div>
            <div className="p1">
                {props.names[1]}<br></br>
                {props.scores[1]}
            </div>
        </div>
    );
}

export default Score;
