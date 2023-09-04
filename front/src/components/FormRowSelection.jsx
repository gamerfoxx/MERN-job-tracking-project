/* eslint-disable react/prop-types */

const FormRowSelect = ({ name, labelText, list, defaultValue = '' }) => {
	return (
		<div className="form-row">
			<label
				htmlFor={name}
				className="form-label">
				{labelText || name}
			</label>
			<select
				id={name}
				name={name}
				className="form-input"
				defaultValue={defaultValue}>
				{list.map((item) => {
					return (
						<option
							key={item}
							value={item}>
							{item}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default FormRowSelect;
