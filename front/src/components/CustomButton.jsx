/* eslint-disable react/prop-types */
function CustomButton({ type, label, disabled }) {
	return (
		<button
			type={type}
			className="btn btn-block"
			disabled={disabled}>
			{label || type}
		</button>
	);
}
export default CustomButton;
