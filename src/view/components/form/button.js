import Button from 'react-bootstrap/Button';
const ButtonComponent = (props) => {
    const handleClick = props.handleClick;
    const text = props.text;
    const className = props.class;
    const type = props.type;
    const variant_type = props.variant_type;

    return (
        <Button type={`${type ?? ''}`} className={`${className ?? ''}`} variant={`${variant_type ?? ''}`} onClick={handleClick ?? null }>{text}</Button>
    );
};

export default ButtonComponent;