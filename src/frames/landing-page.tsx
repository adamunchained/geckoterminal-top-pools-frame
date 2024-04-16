import { Button } from 'frog';
import { Box, Heading, Text, VStack } from '../ui';

export const landingFrame = async (c: any) => {
  // Let's validate whenever they have follow us already.
  const network = c.req.param('network') || '';
  return c.res({
    image: (
      <Box grow alignHorizontal="center" backgroundColor="gray" padding="128">
        <VStack gap="4">
          <Heading>Hit me!</Heading>
          <Text color="text200" size="20">
            Pull latest stats from GeckoTerminal.
          </Text>
        </VStack>
      </Box>
    ),
    intents: [
      <Button action={'/view/' + network}>{'👀 TOP Pools for ' + network.toUpperCase()}</Button>,
    ],
  });
};


