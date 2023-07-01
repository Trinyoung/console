import cls from './box.module.less'
const Box = ({mainEl:Element}) => {
    return (
        <>
            <div className={cls.box}>
                {mainEl}
            </div>
        </>
    )
}
export default Box