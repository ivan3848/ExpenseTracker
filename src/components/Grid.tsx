import { useState } from "react";

interface Props {
	data: Expense[];
	onDelete: (id: number) => void;
	onFilter: (category: string) => void;
}

const Grid = ({ data, onDelete, onFilter }: Props) => {
	const [selectedFilter, setSelectedFilter] = useState("All Categories");
	const filters = ["All Categories", "Groceries", "Utilities", "Entertainment"];

	return (
		<>
			<h1 className="text-center">Expenses</h1>
			<hr />

			<div className="btn-group mb-3">
				<button
					className="btn btn-success dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					data-bs-auto-close="true"
					aria-expanded="false"
				>
					{selectedFilter}
				</button>
				<ul className="dropdown-menu">
					{filters
						.filter((x) => x !== selectedFilter)
						.map((item) => (
							<li
								key={item}
								className="dropdown-item"
								onClick={() => {
									setSelectedFilter(item);
									onFilter(item);
								}}
							>
								{item}
							</li>
						))}
				</ul>
			</div>

			<table className="table table-bordered table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">Description</th>
						<th scope="col">Amount</th>
						<th scope="col">Category</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item: Expense) => (
						<tr key={item.id}>
							<td>{item.description}</td>
							<td>${item.amount}</td>
							<td>{item.category}</td>
							<td>
								<button
									className="btn btn-outline-danger"
									onClick={() => onDelete(item.id)}
								>
									Remove
								</button>
							</td>
						</tr>
					))}
					<tr key={"total"}>
						<th>Total</th>
						<th> ${data.reduce((accumulator, currentValue) => {
								return accumulator + currentValue.amount;
							}, 0)}
						</th>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default Grid;
