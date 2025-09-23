// API service for claims data
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

export const claimsApi = {
	// Search claims with query
	searchClaims: async (query, skip = 0, limit = 10) => {
		const response = await fetch(
			`${API_BASE_URL}/api/claims/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`
		);

		if (!response.ok) {
			throw new Error('Failed to search claims');
		}

		const data = await response.json();

		return {
			claims: data.claims.map(claim => ({
				image_id: claim.image_id,
				id: claim.id,
				title: claim.title,
				evidence: claim.evidence,
				reasoningStrategy: claim.reasoningStrategy,
				sourceOfEvidence: claim.sourceOfEvidence,
				caption: claim.caption,
				domain: claim.domain,
				chartType: claim.chartType
			})),
			skip: data.skip,
			limit: data.limit,
			hasMore: data.hasMore
		};
	},

	// Fetch all claims for a specific image_id
	getClaimsByImageId: async (imageId) => {
		const response = await fetch(
			`${API_BASE_URL}/api/claims/by-image/${imageId}`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch claims by image ID');
		}

		const data = await response.json();

		// Transform the API response to match the expected format
		return data.map(claim => ({
			image_id: claim.image_id,
			id: claim.id,
			title: claim.title,
			evidence: claim.evidence,
			reasoningStrategy: claim.reasoningStrategy,
			sourceOfEvidence: claim.sourceOfEvidence,
			caption: claim.caption,
			domain: claim.domain,
			chartType: claim.chartType
		}));
	}
};