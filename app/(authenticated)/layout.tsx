'use client';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	// Step 1: Create state variables with proper typing

	return (
		<div className="space-y-6">
			{children}
		</div>
	);
}