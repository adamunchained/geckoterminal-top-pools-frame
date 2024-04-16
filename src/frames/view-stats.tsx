import { Button } from 'frog';
import { getTopFivePools } from '../services/gecko.service';
import { Box, Column, Columns, Row, Rows, Text, VStack } from '../ui';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const viewStats = async (c: any) => {
  const network = c.req.param('network') || '';
  const stats = await getTopFivePools(network);
  if (!stats || stats?.error) {
    return c.res({
      image: (
        <Box grow alignHorizontal="center" backgroundColor="blue700" padding="128">
          <VStack gap="4">
            <Text size="20">
              {stats?.error || 'Unable to get stats for selected network from GeckoTerminal!'}
            </Text>
          </VStack>
        </Box>
      ),
      intents: [
        <Button action={'/view/' + network}>{'🔃 Try Again'}</Button>,
      ],
    });
  }

  return c.res({
    image: (
     <Box grow>
      <Rows padding="16" grow>
        <Row height="1/5">
            <Columns gap="4" alignHorizontal="right" grow>
              <Column width="1/4">
                <Text color="green800" size="14" decoration="underline">Pool Name</Text>
              </Column>
              <Column width="1/4">
                <Text color="green800" size="14" decoration="underline">24h Vol</Text>
              </Column>
              <Column width="1/4">
                <Text color="green800" size="14" decoration="underline">Liquidity</Text>
              </Column>
              <Column width="1/4">
                <Text color="green800" size="14" decoration="underline">FDV</Text>
              </Column>
            </Columns>
          </Row>

        {
          stats.map((r: any, i: number) => (
            <Row height="1/5">
              <Columns gap="4" alignHorizontal="right" grow>
                <Column width="1/4">
                  <Text color="green800" size="14" weight="900">{'#' + (i + 1) + ' ' + r.name}</Text>
                </Column>
                <Column width="1/4">
                  <Text color="green800" size="14">{USDollar.format(r.h24)}</Text>
                </Column>
                <Column width="1/4">
                  <Text color="green800" size="14">{USDollar.format(r.liquidity)}</Text>
                </Column>
                <Column width="1/4">
                  <Text color="green800" size="14">{USDollar.format(r.fdv)}</Text>
                </Column>
              </Columns>
            </Row>
          ))
        }
      </Rows>
    </Box>
    ),
    intents: [
      <Button action={'/view/' + network}>{'🔃 TOP Pools for ' + network.toUpperCase()}</Button>,
    ],
  });
};
