import Menu from '../../../../Model/menu'
import './MenuSection.css';

interface MenuProps {
    title: string,
    element: Menu[]
}

export default function MenuSection(props: MenuProps) {
    let render = props.element.map((e, index) => {
        return (
            <div className="menu-element">
                <p className='ingredients'>{e.name + ": " + e.ingredients.join(", ")}</p>
                <p className='allergenes'>{e.allergens.join(", ")}</p>
                <p className='price'>{e.price + " €"}</p>
                {index !== props.element.length - 1 ? <hr /> : ""}
            </div>
        );
    })

    return (
        <div className="menu-header">
            <h2>{props.title}</h2>
            {render}
        </div>
    )
}