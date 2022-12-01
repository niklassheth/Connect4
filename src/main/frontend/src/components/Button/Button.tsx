import "./Button.css";

function Button(props: { children?: string }) {
    return <button className="Button">{props.children}</button>;
}

export default Button;
