import {useContext} from 'react';
import outerContext from './outerContext';
const InnerChild = () => {
    const OuterContext = useContext(outerContext);
    console.log(OuterContext.name, 'dididdididididdiidi')
    return (
        <>
            <div></div>
        </>
    )
}
export default InnerChild;