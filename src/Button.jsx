function Button({text, color, onClick}){
    return(
        <button
        style={{
            backgroundColor: color,
            color: "white",
            padding: "15px 25px",
            margin: "5px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        }}

        onClick={onClick} >
            {text}
        </button>
     );
}


export default Button;