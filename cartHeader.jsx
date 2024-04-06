export const CartHeader = ({handleAllChecked, isAllChceked}) => {
    return (
        <div className="cartHeader">
            <div className="wrap-checkbox">
                <input type="checkbox" onChange={(e) => {
                    handleAllChecked(e.currentTarget.checked);
                }}
                checked={isAllChceked}
                />
                <span>Information</span>
                <span>Quantity</span>
                <span>Price</span>
            </div>
        </div>
    );
};