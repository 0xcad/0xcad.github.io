# 2023-05-17 Even more API abuse
Abusing OpenAI's API to find the tipping point of copypasta violence.

OpenAI has a [moderation endpoint](https://help.openai.com/en/articles/7437393-moderation) that's completely free to use, and doesn't count for your usage limits. I started using it for my internship anyways so it was the perfect target to abuse (while maybe being able to justify some value out of it).

Anyways, provided with some text the moderation API will return its estimations of whether the text violates several categories of OpenAI's content policy. I wanted to find out, word by word, what the exact tipping point of violation was.

## some code
```
def isSafe(input_str):
    api_response = openai.Moderation.create(input=input_str)
    output = api_response["results"][0]
    if not True in output.get('categories', {}).values():
        return True
    else:
        print(output)
        return False

copypasta = "<NAVY SEAL COPYPASTA>"
split = copypasta.split(' ')

#go word by word in unsafe passages
i = 1
while i < len(split):
    subpasta = ' '.join(split[:i])
    if not isSafe(subpasta):
        print(subpasta)
        _ = input('')
    i += 1
print(subpasta)
```

## results
The first time the copypasta was flagged was at word 16,
> What the fuck did you just fucking say about me, you little bitch? I'll have you

Interestingly enough, the next time it was flagged was at word 49,
> What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla

I guess this makes sense. "I'll have you" is a little more threatening than "I'll have you know"

We get flagged only a few more times up to words 50, 54, 55, 57, 59, 60. The gaps I thought were interesting enough to me. Just one word is able to shift what was already added?

It's finally until word 79 that we get consistency:
> What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I

From here on out, it's all violence.
