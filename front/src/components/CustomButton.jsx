/* eslint-disable react/prop-types */
function CustomButton({ type, label }) {
	return (
		<button
			type={type}
			className="btn btn-block">
			{label || type}
		</button>
	);
}
export default CustomButton;
