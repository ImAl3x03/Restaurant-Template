import Menu from '../../../../Model/menu'
import css from './MenuSection.module.css';

interface MenuProps {
    title: string,
    element: Menu[]
}

export default function MenuSection(props: MenuProps) {
    let render = props.element.map((e, index) => {
        return (
            <div className="my-[10px]">
                <p className='text-[1.5em] py-[2px] px-[10px]'>{e.name + ": " + e.ingredients.join(", ")}</p>
                <p className='text-[1.25em] py-[2px] px-[10px]'>{e.allergens.join(", ")}</p>
                <p className='text-[1.25em] py-[2px] px-[10px] italic'>{e.price + " €"}</p>
                {index !== props.element.length - 1 ? <hr /> : ""}
            </div>
        );
    })

    return (
        <div className={"p-[20px] my-[20px] rounded-[10px] bg-[#F5F5F5] " + css.menuHeader} >
            <h2 className={"pl-[5px] text-[2.5em] " + css.title}>{props.title}</h2>
            {render}
        </div>
    )
}