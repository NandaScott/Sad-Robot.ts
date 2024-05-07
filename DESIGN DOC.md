# Sad Robot Design Doc

Sad Robot is a Discord bot designed to fetch Magic: The Gathering cards and data in an easy to use interface.

The following document is designed to be an outline for the technical requirements and scope of the program. It is not exhaustive and may be subject to change in the future.

## Goals

The goal of this project overall is to showcase my own technical skills, process, and rationale. Relatively speaking, this project will end up more complicated than is reasonable for a program of this scale and should not be used as a template for all Discord bots. Developers should strive more for a simple yet elegant program. This is simply done as an exercise, and does not represent how I approach every program.

## Who does this serve?

This bot is being primarily designed for my personal Discord server of ~50 users. Due to the small scale of requests and users, I'm not going to be concerning myself with code efficiency or optimization. This project is going to focus on readability and extensibility. In the event that I decide to scale up the userbase, I'll revisit it.

## MVP

For those that aren't familiar, the Minimum Viable Product (MVP) is a concept that helps understand the smallest amount of coding that satisfies the core functionality required. This is helpful to prevent scope creep, where we inadvertantly keep adding small features to the program which could end up delaying the final product. Sad Robot is going to have a simple MVP:

1. The bot needs to be able to read messages in any channel on the server, including threads.
2. The bot needs to be able to parse a message for a key pattern that tells it to fetch a Magic card.
3. The bot needs to reach out to a 3rd party API and send back data based on what was or wasn't found.
4. The bot should post an image or images of the card requested to the channel it was requested from.
5. In the event of an error from the server or program, the bot should reply with an error message to the channel the card was requested from.

## Tech Stack

- Typescript
- Discord.js
- Prettier
- Bun
- GitHub
- GitHub Actions
- AWS
- Docker

## Coding Patterns

For this project I'm deciding to write it with an Object Orient Program (OOP) approach, with a dependency injection pattern. I chose this because I haven't had much experience with OOP and it could be an interesting challenge. I'm not sure that this is the best way to write a bot, since there are many pitfalls you could run into with OOP. That's a problem for future-me to solve.

I think that dependency injection would provide me a way to really unit test the app. By creating mock dependencies I can isolate each piece and ensure that one bug doesn't cascade into other parts of the app.
