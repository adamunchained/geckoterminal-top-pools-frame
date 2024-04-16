export const getTopFivePools = async (network: string): Promise<any> => {
  try {
    const response = await fetch(
      'https://api.geckoterminal.com/api/v2/networks/' + network + '/pools?page=1',
    );
    const obj = await response.json();
    // Super stupid and basic error handling.
    if (!obj) {
      return;
    }

    if (obj?.status?.error_code === 429) {
      return {
        error:
          'Frame exceeded the APIs Rate Limit. We only use free tier API access to Coingecko. Try again later.',
      };
    }

    return obj.data.slice(0, 5).map((o: any) => {
      return {
        name: o.attributes.name,
        h24: o.attributes.volume_usd.h24,
        liquidity: o.attributes.reserve_in_usd,
        fdv: o.attributes.fdv_usd,
      };
    });
  } catch (e) {
    console.error(e);
    // Super stupid and basic error handling.
    return;
  }
};
