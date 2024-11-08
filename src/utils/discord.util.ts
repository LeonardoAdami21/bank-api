export const sendDiscordMessage = async (
  url: string,
  msg: string,
  prod: boolean,
  /** Ele fica feliz quando não tem erro */
  isHappy: boolean,
) => {
  /** Versões menos recentes do Node não possuem fetch */
  const is_fetch_avaliable_nodejs = typeof fetch === 'function';
  if (is_fetch_avaliable_nodejs && url && prod) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: msg,
        username: `${isHappy ? 'Happy' : 'Sad'} Bank Api Builds`,
      }),
    });
  }
};
