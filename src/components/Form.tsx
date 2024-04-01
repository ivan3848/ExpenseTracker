import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	description: z
		.string()
		.min(2, { message: "At least 2 characters are required" }),
	amount: z.number().min(1),
	category: z.string(),
});

interface Props {
	onSubmit: (data: Expense) => void;
}

const Form = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<Expense>({ resolver: zodResolver(schema) });

	const [selectedIndex, setSelectedIndex] = useState(0);
	const categories = ["Groceries", "Utilities", "Entertainment"];

	return (
		<>
			<h1 className="text-center">Add Expenses</h1>
			<form
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
					reset();
				})}
			>
				<div>
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						{...register("description")}
						type="text"
						id="description"
						className="form-control"
					/>
					{errors.description && (
						<p className="text-danger">{errors.description.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="amount" className="col-form-label">
						Amount
					</label>

					<input
						{...register("amount", { valueAsNumber: true })}
						type="number"
						id="amount"
						className="form-control"
					/>
					{errors.amount && (
						<p className="text-danger">{errors.amount.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="" className="col-form-label">
						Categories
					</label>
					<div className="input-group mb-3">
						<input
							{...register("category")}
							readOnly
							id="category"
							className="form-control"
							aria-label="Text input with dropdown button"
							value={categories[selectedIndex]}
						/>
						<button
							type="button"
							className="btn btn-primary dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Choose
						</button>
						<ul className="dropdown-menu">
							{categories.map((item, index) => (
								<li
									key={item}
									onClick={() => setSelectedIndex(index)}
									className={
										selectedIndex === index
											? "dropdown-item active pe-none"
											: "dropdown-item pointer "
									}
								>
									{item}
								</li>
							))}
						</ul>
					</div>
					{errors.category && (
						<p className="text-danger">{errors.category.message}</p>
					)}
				</div>

				<div>
					<button disabled={!isValid} className="btn btn-primary">
						Submit
					</button>
				</div>
			</form>
		</>
	);
};

export default Form;
