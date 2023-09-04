/* eslint-disable react/prop-types */
function CustomButton({ type, label, disabled, classes }) {
	return (
		<button
			type={type}
			className={classes ? 'btn btn-block ' + classes : 'btn btn-block'}
			disabled={disabled}>
			{label || type}
		</button>
	);
}
export default CustomButton;
