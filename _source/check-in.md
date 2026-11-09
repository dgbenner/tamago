# Tamago check-in

Updated November 9, 2026, end of Phase 4, as far as it goes without accounts. Phase 3 was finished earlier today; it's in the build log.

## Done since last check-in

- **Phase 3 (live):** Words with Match and Flashcards; Verbs; review checkpoints; Your topic (Unit 6) with seven topics; the variant test bank.
- **Phase 4 (live), everything that needs no account:**
  - **Native-speaker check** (Settings, For Dan): the checker goes through the 154 sentences on any phone. Each one is marked Natural or Needs a fix, with a corrected version, a note and a recording, then saved as one file for you. I fold the file in: checked sentences are marked, fixes are applied, and recordings play in lessons, converted so iPhones play them too.
  - **Flag review** (Settings, For Dan): "My answer should be accepted" flags now keep what was typed. Accept counts it on this device at once. Save for Claude, and after my import it counts for everyone at the next deploy.
  - **Profile and backup** (Settings): a screen name, and a backup file that carries all progress to another phone or browser.
  - **Claude explains mistakes**: built, and off until there's a key. After a wrong typed answer a quiet "Why?" appears once the explanation has arrived; nothing waits for it.
  - **Discussions and Forum**: shown as needs setup, with the agreed sections.
- Workbook v13 (no content change; changelog row).

## Decisions made

- **Recordings:** the checker ticks a box to share their recordings under CC BY-SA 4.0, credited on About. Without the tick they aren't used.
- **Fixes to Unit 1 sentences** (which come from the workbook, not drafts) are held back from the app until I've applied them, so nothing half-fixed ships.
- **Explanations:** the cheaper model the feature list asks for (Claude Haiku 5.5). It may only use the sentence, the accepted answers and the Wiktionary hints, so no definitions from memory. There's a cap of 30 a day per device until sign-in allows a real per-learner limit.
- **Phase 3:** topics stay out of placement, checkpoints and scores until chosen. I cut 14 pulled topic sentences that were idioms, misleading or odd. The first topic lesson crashed; a new-word rule fixes it (only a unit's own words count as new).

## Waiting for Dan

1. **Native-speaker check.** Arrange the person. On their phone they open https://tamago-590.netlify.app, then Settings, then Native-speaker check. When they're done they tap Save the results and send you the file. Put it in _source/ and I'll fold it in.
2. **Claude explanations (costs money, needs your API key).**
   1. In the Anthropic Console (https://console.anthropic.com), create an API key.
   2. In Netlify (https://app.netlify.com), open the site tamago-590, then Site configuration, then Environment variables. Add TAMAGO_ANTHROPIC_API_KEY with the key as its value. Use a key made for Tamago: your Netlify account already has an ANTHROPIC_API_KEY (from another project, I assume), and Tamago deliberately ignores it. For about two minutes after the first Phase 4 deploy the function would have used that shared key; it was only reachable after a wrong typed answer on the live site, and the fix went live right after.
   3. Under Deploys, choose Trigger deploy. Settings then shows explanations as on.
   - Cost: Haiku 5.5 is $0.10 per million input tokens and $0.50 per million output, and one explanation is a few hundred tokens. A thousand explanations cost well under a dollar.
3. **Sign-in, sync, discussions, flags from testers (a new account).** These need an account service with a database. My suggestion is Supabase (https://supabase.com, free tier, sign-in by email link). Say yes and create the project, and I'll walk you through the keys one step at a time.
4. **Testers (your call).** When you say go, I'll turn Testing shortcuts off by default and give you the link to send. Until there's a server, testers send their flags by saving the flags file.
5. **Earlier items:**
   - Try the topics and Words on your phone.
   - Hosting: the Netlify badge can't be hidden; moving to Cloudflare Pages needs your account.

## Drafted sentences

**U02 Basics 2** (23)

- S2101 Le livre est ici ? = Is the book here? (QT09 question)
- S2102 Oui, le livre est ici. = Yes, the book is here. (QT09 answer)
- S2103 Les enfants sont ici ? = Are the children here? (QT09 question)
- S2104 Oui, les enfants sont ici. = Yes, the children are here. (QT09 answer)
- S2105 La lettre est ici ? = Is the letter here? (QT09 question)
- S2106 Oui, voici la lettre. = Yes, here is the letter. (QT09 answer)
- S2107 Elle est grande ? = Is she tall? (QT09 question)
- S2108 Non, elle est petite. = No, she is short. (QT09 answer)
- S2109 Voici les hommes. = Here are the men.
- S2110 Voici le journal. = Here is the newspaper.
- S2111 Les femmes sont ici. = The women are here.
- S2112 Les hommes et les femmes sont ici. = The men and the women are here.
- S2113 Les garçons sont ici. = The boys are here.
- S2114 Voici les garçons et les filles. = Here are the boys and the girls.
- S2115 Les filles sont ici. = The girls are here.
- S2116 Les garçons ? Ils sont ici. = The boys? They are here.
- S2117 Les hommes ? Ils sont ici. = The men? They are here.
- S2118 Les filles ? Elles sont ici. = The girls? They are here.
- S2119 Voici les enfants. = Here are the children.
- S2120 Voici les femmes. = Here are the women.
- S2121 La lettre est petite. = The letter is small.
- S2122 Le journal est ici. = The newspaper is here.
- S2123 Le garçon ? Il est ici. = The boy? He is here.

**U03 Phrases** (20)

- S3101 Vous êtes Paul ? = Are you Paul? (QT09 question)
- S3102 Non, je suis Marie. = No, I'm Marie. (QT09 answer)
- S3103 Ça va, Marie ? = Are you OK, Marie? (QT09 question)
- S3104 Oui, ça va bien. = Yes, I'm fine. (QT09 answer)
- S3105 Tu es Marie ? = Are you Marie? (QT09 question)
- S3106 Oui, bonsoir ! Je suis Marie. = Yes, good evening! I'm Marie. (QT09 answer)
- S3107 Comment ça va, Paul ? = How are you, Paul? (QT09 question)
- S3108 Bien, merci, Marie. = Fine, thanks, Marie. (QT09 answer)
- S3109 Excusez-moi, vous êtes Paul ? = Excuse me, are you Paul?
- S3110 Excusez-moi, s'il vous plaît. = Excuse me, please.
- S3111 Excusez-moi, je suis Marie. = Excuse me, I'm Marie.
- S3112 Pardon, tu es Paul ? = Sorry, are you Paul?
- S3113 Pardon, Marie ! = Sorry, Marie!
- S3114 Pardon, c'est ici ? = Excuse me, is it here?
- S3115 Paul, s'il te plaît ! = Paul, please!
- S3116 Oui, s'il te plaît. = Yes, please.
- S3117 Bonsoir, Paul ! = Good evening, Paul!
- S3118 Bonne nuit, Marie. = Good night, Marie.
- S3119 De rien, Paul. = You're welcome, Paul.
- S3120 Au revoir, à bientôt ! = Goodbye, see you soon!

**U04 Food** (11)

- S4101 Tu manges une pomme ? = Are you eating an apple? (QT09 question)
- S4102 Oui, je mange une pomme. = Yes, I'm eating an apple. (QT09 answer)
- S4103 Tu aimes le fromage ? = Do you like cheese? (QT09 question)
- S4104 Oui, j'aime bien le fromage. = Yes, I quite like cheese. (QT09 answer)
- S4105 Tu manges du pain ? = Are you eating bread? (QT09 question)
- S4106 Non, je mange un sandwich. = No, I'm eating a sandwich. (QT09 answer)
- S4107 Tu aimes le lait ? = Do you like milk? (QT09 question)
- S4108 Non, j'aime l'eau. = No, I like water. (QT09 answer)
- S4109 Il mange une orange. = He's eating an orange.
- S4110 Tu aimes le pain ? = Do you like bread?
- S4111 Elle mange un sandwich. = She's eating a sandwich.

**U05 Animals** (12)

- S5101 Tu as un chien ? = Do you have a dog? (QT09 question)
- S5102 Oui, j'ai un petit chien. = Yes, I have a small dog. (QT09 answer)
- S5103 Tu as un chat ? = Do you have a cat? (QT09 question)
- S5104 Non, j'ai une tortue. = No, I have a tortoise. (QT09 answer)
- S5105 Il a un cheval ? = Does he have a horse? (QT09 question)
- S5106 Oui, il a un grand cheval. = Yes, he has a big horse. (QT09 answer)
- S5107 Tu as un oiseau ? = Do you have a bird? (QT09 question)
- S5108 Non, j'ai un canard. = No, I have a duck. (QT09 answer)
- S5109 La tortue est petite. = The tortoise is small.
- S5110 J'ai une tortue et un oiseau. = I have a tortoise and a bird.
- S5111 Le canard mange. = The duck is eating.
- S5112 La souris est petite. = The mouse is small.

**U101 Weather** (7)

- S6051 Elle aime la pluie. = She likes the rain.
- S6052 J'aime le soleil. = I like the sun.
- S6053 Voici le soleil ! = Here is the sun!
- S6054 Il a chaud. = He's hot.
- S6055 Le soleil est grand. = The sun is big.
- S6056 Tu as du temps ? = Do you have time?
- S6057 Il a du temps. = He has time.

**U102 Family** (12)

- S6151 La mère et le père sont ici. = The mother and the father are here.
- S6152 Voici le père. = Here is the father.
- S6153 J'ai un fils. = I have a son.
- S6154 Le fils est petit. = The son is small.
- S6155 Le bébé est ici. = The baby is here.
- S6156 Les parents sont ici. = The parents are here.
- S6157 Voici les parents. = Here are the parents.
- S6158 Voici la mère. = Here is the mother.
- S6159 La mère est ici. = The mother is here.
- S6160 Le père est ici. = The father is here.
- S6161 Les parents et les enfants sont ici. = The parents and the children are here.
- S6162 Voici le bébé. = Here is the baby.

**U103 Home** (16)

- S6251 La chambre est petite. = The room is small.
- S6252 Voici la chambre. = Here is the room.
- S6253 C'est une grande chambre. = It's a big room.
- S6254 Le lit est ici. = The bed is here.
- S6255 Le lit est grand. = The bed is big.
- S6256 J'ai un petit lit. = I have a small bed.
- S6257 La porte est petite. = The door is small.
- S6258 Voici la porte. = Here is the door.
- S6259 C'est une grande porte. = It's a big door.
- S6260 La fenêtre est grande. = The window is big.
- S6261 Voici la fenêtre. = Here is the window.
- S6262 La table et la chaise sont ici. = The table and the chair are here.
- S6263 Voici une chaise. = Here is a chair.
- S6264 La cuisine est petite. = The kitchen is small.
- S6265 Voici la cuisine. = Here is the kitchen.
- S6266 C'est une petite fenêtre. = It's a small window.

**U104 Music** (7)

- S6351 Il aime la musique. = He likes music.
- S6352 J'aime la chanson. = I like the song.
- S6353 Il a un piano. = He has a piano.
- S6354 Le piano est grand. = The piano is big.
- S6355 Elle a une guitare. = She has a guitar.
- S6356 J'aime la guitare. = I like the guitar.
- S6357 Voici la chanson. = Here is the song.

**U105 Coffee shop** (7)

- S6451 J'aime le chocolat. = I like chocolate.
- S6452 Une tasse de café, s'il vous plaît. = A cup of coffee, please.
- S6453 Une tasse de thé, s'il te plaît. = A cup of tea, please.
- S6454 La tasse est petite. = The cup is small.
- S6455 Un croissant, s'il vous plaît. = A croissant, please.
- S6456 Je mange un croissant. = I'm eating a croissant.
- S6457 Le croissant est grand. = The croissant is big.

**U106 Supermarket** (12)

- S6551 Je mange du poulet. = I'm eating chicken.
- S6552 Je mange du riz. = I'm eating rice.
- S6553 Du riz, s'il vous plaît. = Rice, please.
- S6554 Je mange une banane. = I'm eating a banana.
- S6555 C'est une tomate. = It's a tomato.
- S6556 Je mange une tomate. = I'm eating a tomato.
- S6557 J'ai un œuf. = I have an egg.
- S6558 Voici un œuf. = Here is an egg.
- S6559 J'aime les œufs. = I like eggs.
- S6560 Du beurre, s'il vous plaît. = Butter, please.
- S6561 J'aime le beurre. = I like butter.
- S6562 Il mange une banane. = He's eating a banana.

**U107 The beach** (9)

- S6651 Voici la plage. = Here is the beach.
- S6652 La plage est grande. = The beach is big.
- S6653 J'aime la mer. = I like the sea.
- S6654 La mer est grande. = The sea is big.
- S6655 Voici la mer. = Here is the sea.
- S6656 J'ai un bateau. = I have a boat.
- S6657 Le bateau est petit. = The boat is small.
- S6659 J'aime le sable. = I like the sand.
- S6660 Le sable est ici. = The sand is here.

