import Button from "./Button";

export default function ProductCard({title, description}){
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <Button label="View Product" />
            <hr />
        </div>
    );
}
