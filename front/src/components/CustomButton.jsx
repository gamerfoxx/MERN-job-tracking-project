/* eslint-disable react/prop-types */
function CustomButton({ type, label, disabled, classes, onClick }) {
	return (
		<button
			type={type}
			className={classes ? 'btn btn-block ' + classes : 'btn btn-block'}
			disabled={disabled}
			onClick={onClick}>
			{label || type}
		</button>
	);
}
export default CustomButton;
