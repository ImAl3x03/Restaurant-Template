import Menu from '../../../../Model/menu'

interface MenuProps {
    title: string,
    element: Menu[]
}

export default function MenuSection(props: MenuProps) {
    let render = props.element.map((e) => {
        return (
            <>
                <h3>{e.name}</h3>
                <p className='ingredients'>{e.ingredients}</p>
                <p className='allergenes'>{e.allergens}</p>
                <p className='price'>{e.price}</p>
            </>
        );
    })

    return (
        <>
            <h2>{props.title}</h2>
            {render}
        </>
    )
}