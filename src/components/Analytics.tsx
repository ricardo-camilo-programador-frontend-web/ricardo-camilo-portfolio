export function Analytics() {
	return (
		<>
			<script
				async
				defer
				data-domain="ricardocamilo.dev"
				src="https://plausible.io/js/plausible.js"
			/>
			<noscript>
				<div>
					<img
						src="https://plausible.io/api/event?domain=ricardocamilo.dev"
						alt=""
					/>
				</div>
			</noscript>
		</>
	);
}
