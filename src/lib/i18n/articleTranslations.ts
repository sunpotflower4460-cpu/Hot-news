import type { Article } from '@/types/article';
import type { Locale } from './messages';

interface ArticleTranslation {
  title: string;
  summary: string;
  body: string;
  sourceName: string;
  whyComfort: string;
  region: string;
}

const ENGLISH_ARTICLES: Record<string, ArticleTranslation> = {
  a01: {
    title: 'Rescued fox cub returns to a northern forest after six months of care',
    summary:
      'A mountain animal clinic rescued a fox cub with a broken leg. After six months of rehabilitation, it quietly returned to the early-summer forest.',
    body: 'A small animal clinic in the mountains of Hokkaido rescued a fox cub that had broken its leg at the beginning of winter. The staff cared for it from a distance so it could return to the wild without becoming too accustomed to people.\n\nAfter six months of rehabilitation, the fox recovered enough to run on its own. One early-summer morning, the cage door opened at the edge of the forest, and the cub ran into the trees without looking back.\n\n“All we said was, take care,” a staff member said. The farewell was sad, but they knew it was the happiest possible ending.',
    sourceName: 'Northern Forest Journal',
    whyComfort:
      'Human care quietly supported the fox’s own strength to return to the wild. The farewell is bittersweet, but it leaves the feeling that freedom was the kindest outcome.',
    region: 'Japan · Hokkaido',
  },
  a02: {
    title: 'Ten minutes on a snowy morning when strangers pushed a stranded bus',
    summary:
      'A city bus became stuck on a hill. People passing by naturally gathered, called out to one another, and pushed it from behind.',
    body: 'On a morning of record snowfall, a city bus lost traction and became stuck on a hill. As the passengers waited, commuters began to gather one by one.\n\nAt the call of “Ready, go,” more than a dozen people pushed from behind, and the bus slowly began to climb. The driver bowed repeatedly through the window, while the helpers smiled shyly and returned to their own mornings.\n\n“Once one person started, everyone’s hands seemed to move naturally,” said someone who was there.',
    sourceName: 'Neighborhood News',
    whyComfort:
      'One small act invited strangers to join without hesitation. It is a scene that makes kindness feel wonderfully contagious.',
    region: 'Japan · Tohoku',
  },
  a03: {
    title: 'A device lets people with visual impairments feel color in their palms',
    summary:
      'A small device turns colors into subtle vibration patterns. At a museum trial, visitors experienced the colors of paintings through touch.',
    body: 'A palm-sized device that converts differences in color into vibration patterns was tested at a museum event. It was developed through a joint project between a university research team and a welfare organization.\n\nBlue feels slow and spacious, while red feels fine and rapid. Each color reaches the fingertips as a different rhythm. One participant said, “For the first time, I could receive the colors in a painting through my own senses.”\n\nThe team said it values an emotionally moving experience more than perfect accuracy. It is now considering trials in schools and libraries.',
    sourceName: 'Bright Tech',
    whyComfort:
      'The technology is being used not only for convenience, but to create a meaningful human experience. It offers a tangible glimpse of a gentler future.',
    region: 'Japan · Kansai',
  },
  a04: {
    title: 'A town-wide “walking library” enters its third spring',
    summary:
      'Residents place small bookshelves outside their homes for anyone to borrow from. The town now has 120 of them.',
    body: 'What began with one small bookshelf outside a single home has spread across the town in three years. Books can be returned whenever people like, and readers may leave another book in exchange. Those are the only relaxed rules.\n\nThere are now 120 shelves. Children choose picture books beside older residents browsing paperbacks, and the scene has become part of everyday life. Many people say the books have also led to more greetings between neighbors.\n\n“The books have become the town’s shared front porch,” the project’s founder said with a smile.',
    sourceName: 'Neighborhood News',
    whyComfort:
      'A modest act of generosity slowly changed the town’s everyday landscape. It conveys the comfort of a community connected by trust.',
    region: 'Japan · Chubu',
  },
  a05: {
    title: 'Citizens restore a wetland that now welcomes migrating birds',
    summary:
      'A wetland once considered for development has been gradually restored by local residents. Thousands of migrating birds rested there this year.',
    body: 'Thousands of migrating birds landed this spring in a coastal wetland that was once considered for development. A community group spent ten years restoring waterways and native vegetation.\n\nWeekend volunteers range from children to retirees. “Every time the number of birds grows, we can feel the trace of our own work,” one participant said.\n\nExperts called the return of such an important stopover near a city a rare achievement. Birdwatching events now attract visitors from outside the region.',
    sourceName: 'Northern Forest Journal',
    whyComfort:
      'Nature that was nearly lost has returned little by little through patient human effort. Kindness sustained over many years carries a quiet strength.',
    region: 'Japan · Kanto',
  },
  a06: {
    title: 'A handwritten note left by a late-night convenience-store clerk',
    summary:
      'A customer dropped a glove after working late. The next morning, a handwritten note beside it made them stop in their tracks.',
    body: 'An office worker dropped one glove at a convenience store after a late shift. When they returned the next morning, the glove was waiting beside the register with a handwritten note.\n\n“It’s getting colder. I found this for you. Please stay warm.” The short message moved the customer deeply.\n\nAfter a photo was shared online, people quietly responded that small kindnesses like this can carry them through difficult days. The clerk simply said, “I only did what anyone would do.”',
    sourceName: 'Night News Notebook',
    whyComfort:
      'A small, selfless gesture quietly supported a stranger’s day. It is the kind of kindness worth remembering before sleep.',
    region: 'Japan · Kanto',
  },
  a07: {
    title: 'A closed school music room becomes home to an intergenerational choir',
    summary:
      'The community reopened an old elementary-school music room, where singers from age seven to 82 now make music together.',
    body: 'A music room in an elementary school closed because of declining enrollment has found new life as the rehearsal space for a community choir. Its members range from seven to 82 years old and meet once a week to sing together.\n\n“I never imagined singing the same song as children who feel like my grandchildren,” said the oldest member. The children happily say they love the powerful low voices of the older singers.\n\nA small community concert is planned for autumn. The former teacher conducting the choir hopes to hear the school song resonate in the room once again.',
    sourceName: 'Neighborhood News',
    whyComfort:
      'A place that had finished one role and people from different generations are united through song. It carries the warmth of an ending becoming a new beginning.',
    region: 'Japan · Shikoku',
  },
  a08: {
    title: 'A smart collar helps a lost dog reunite with its family in three hours',
    summary:
      'A neighborhood safety tag connected to nearby phones found a missing dog, helping the family reunite in just three hours.',
    body: 'A dog that slipped free during a walk returned to its family only three hours later with help from a neighborhood safety network.\n\nA small tag on the collar communicates loosely with nearby phones. Its privacy-conscious design sends the location only to the dog’s owner.\n\n“We were beginning to lose hope when the notification arrived,” the owner said. The development team explained, “We wanted to make that frightening period as short as possible.”',
    sourceName: 'Bright Tech',
    whyComfort:
      'Technology worked to shorten a family’s anxious wait. It shows the reassurance that can exist beyond convenience alone.',
    region: 'Japan · Kyushu',
  },
  a09: {
    title: 'A reply to a childhood picture letter arrives 20 years later',
    summary:
      'A response to a picture letter sent during childhood finally arrived from overseas after two decades.',
    body: 'When she was in elementary school, a woman sent a picture letter to a child overseas through an international exchange event. Twenty years later, a reply finally reached her.\n\nThe recipient had carefully kept the original through every move and had eventually found the sender’s address. The new letter included a photograph of the childhood drawing and the words, “I always wanted to thank you.”\n\nThe two have arranged to meet online. “It feels as though my childhood self sent my present self a gift,” the woman said.',
    sourceName: 'Night News Notebook',
    whyComfort:
      'Kindness that traveled across time gently connects the past and present. It is a quiet reunion to read at night.',
    region: 'Overseas · Europe',
  },
  a10: {
    title: 'A green ribbon begins to grow across the desert',
    summary:
      'A simple restoration project scatters seeds wrapped in clay across dry land. Over several years, isolated green spots have begun to connect.',
    body: 'In a region facing increasing drought, a simple restoration project is showing quiet results. Volunteers scatter small balls of seeds wrapped in clay and wait for rain to help them sprout naturally.\n\n“We don’t need large machines or irrigation channels. What matters is that anyone can take part,” a local participant said. Over several years, scattered patches of green have gradually begun to form a ribbon.\n\nExperts say the approach is not dramatic, but it is well suited to the land.',
    sourceName: 'Northern Forest Journal',
    whyComfort:
      'A modest step that almost anyone can take is slowly changing the land. It shows the strength of kindness without strain or spectacle.',
    region: 'Overseas · Africa',
  },
  a11: {
    title: 'A young craftsperson carries on a shopping street’s hand-painted signs',
    summary:
      'A craft that was beginning to disappear is being learned by a worker in their twenties, along with the old tools used to create it.',
    body: 'Hand-painted signs have gradually disappeared as digital printing became common. Now, a craftsperson in their twenties has begun studying the technique at a long-established sign shop.\n\nBrush movement, paint mixing, and the breathing space inside each character are passed down alongside tools worn smooth through decades of use. “Even the same word becomes part of the town’s expression when written by hand,” the young craftsperson said.\n\nShop owners along the street are already asking for new signs of their own.',
    sourceName: 'Neighborhood News',
    whyComfort:
      'A fading handcraft is being passed to a younger generation. There is beauty in the act of carrying something forward.',
    region: 'Japan · Kansai',
  },
  a12: {
    title: '“Welcome home” becomes a neighborhood phrase at a children’s kitchen',
    summary:
      'A phrase spoken as children leave a weekend community kitchen gradually became a greeting used throughout the neighborhood.',
    body: 'At a weekend community kitchen for children, staff have made a habit of saying “Welcome home” as each child leaves. The words express the hope that this place can feel like another home.\n\nThe phrase gradually spread into the neighborhood, and adults along the shopping street began greeting children with “Welcome home” as they passed.\n\n“Knowing there is somewhere you can return to may be enough,” one organizer said.',
    sourceName: 'Night News Notebook',
    whyComfort:
      'Two simple words give children a sense of belonging. Their warmth helps the mind loosen at the end of the day.',
    region: 'Japan · Chugoku',
  },
  a13: {
    title: 'A gentle glow makes tactile paving easier to see at night',
    summary:
      'A station plaza is testing softly glowing pavement that helps people find tactile guidance blocks after dark.',
    body: 'A station plaza has begun testing pavement that stores daylight and glows softly after dark, making tactile guidance blocks easier to see. It uses no electricity and is designed to avoid harsh glare.\n\n“It helps not only people using white canes, but children and older pedestrians too,” one visitor said. The designer explained, “We wanted a light that quietly stays beside people rather than demanding attention.”\n\nThe response has been positive, and other stations are considering the same approach.',
    sourceName: 'Bright Tech',
    whyComfort:
      'The goal is not to stand out, but to quietly support. The gentleness of that design philosophy is reassuring in itself.',
    region: 'Japan · Kanto',
  },
  a14: {
    title: 'An elephant herd takes turns staying beside an elderly companion',
    summary:
      'At a sanctuary, herd members took turns watching over and supporting an elderly elephant for an entire week.',
    body: 'At a wildlife sanctuary, an elderly elephant had become too weak to walk easily. Researchers recorded members of the herd taking turns staying beside their companion.\n\nWhen one elephant moved away, another approached and gently supported the elder with its trunk. The pattern continued for a week. “It reminded us of the depth of elephants’ social bonds,” a researcher said.\n\n“It should have felt like a sad scene, but there was so much warmth in it,” a staff member said. The herd continues to live calmly at the sanctuary.',
    sourceName: 'Northern Forest Journal',
    whyComfort:
      'The animals’ care for one another reveals compassion that reaches across species. It is a quiet story to sit with in the evening.',
    region: 'Overseas · Asia',
  },
  a15: {
    title: 'Children’s “pictures of the future” brighten a recovering community',
    summary:
      'Drawings of a bright future made by children in another town filled a temporary community hall in a disaster-affected area.',
    body: 'A community rebuilding after a disaster displayed drawings titled “A Bright Future,” created by children from a distant town. Flying trains, rainbow-colored fields, and smiling animals filled the walls with free imagination.\n\n“Daily life has been full of difficult conversations. These pictures gave us a moment to smile,” one resident said. The children added messages saying that although they had never met the residents, they hoped the pictures would help them feel better.\n\nThe exhibition is planned to travel through the region.',
    sourceName: 'Neighborhood News',
    whyComfort:
      'The pictures were drawn with care for people the children had never met. Their straightforward goodwill traveled across the distance.',
    region: 'Japan · Tohoku',
  },
  a16: {
    title: 'Small rain gardens help cool city neighborhoods',
    summary:
      'Tiny gardens built in unused residential spaces collect rainwater, grow plants, and have begun to soften summer heat.',
    body: 'Small “rain gardens” are spreading through narrow unused spaces in residential neighborhoods. By holding rainwater, reducing pavement, and adding soil and plants, they can ease summer heat.\n\nMeasurements found periods when the temperature around the gardens was several degrees lower. Residents call them “gardens that water the street by themselves.”\n\nButterflies and dragonflies have also returned, and the spaces have become observation spots for children.',
    sourceName: 'Bright Tech',
    whyComfort:
      'A practical change in daily life can be gentle to both the city and living things. It offers the feeling that an approachable idea can shape the future.',
    region: 'Japan · Chubu',
  },
  a17: {
    title: 'A small session forms around a station piano before the last train',
    summary:
      'People gathered around a public station piano and, almost without noticing, began playing one song together.',
    body: 'One evening before the last train, a small moment unfolded around a public piano at a station. One person began a melody, another stopped to hum, and someone else added a handclap. Before long, it had become an improvised session.\n\nWhen the song ended, strangers exchanged applause and smiles. “The tiredness of the day suddenly felt lighter,” one person said.\n\nIt was a small gift at a nighttime station, with no single person responsible for beginning it.',
    sourceName: 'Night News Notebook',
    whyComfort:
      'For a brief moment, strangers connected through music. It feels like a gentle bit of magic before the last train.',
    region: 'Japan · Kanto',
  },
  a18: {
    title: 'A volunteer foster network for kittens grows across prefectures',
    summary:
      'Adoption events for rescued kittens are expanding through a network of volunteers who first connected online.',
    body: 'Adoption events for rescued kittens are now being held across prefectural borders through cooperation among volunteers who connected online.\n\nTo reduce travel stress, nearby participants created a relay system that carries each kitten part of the way. “Some things are impossible alone, but become real when people connect,” an organizer said.\n\nMany kittens found new families this spring. Adopters and volunteers continue sharing updates through a loose, supportive network.',
    sourceName: 'Northern Forest Journal',
    whyComfort:
      'People who care about small lives are connecting and supporting one another. The chain of kindness is deeply reassuring.',
    region: 'Japan · Kanto',
  },
  a19: {
    title: 'A monthly “slow café” gives people with aphasia time to speak',
    summary:
      'A café opens once a month where people who find words difficult can speak without being rushed.',
    body: 'A “slow café” opens once a month for people who have difficulty finding words after a brain condition or injury. Staff and regular visitors value one thing above all: waiting patiently for each person to finish.\n\n“No one rushes me before I can express what I mean. I never knew how safe that could feel,” one visitor said. Writing and gestures are treated as complete forms of conversation.\n\nThe kindness of waiting is beginning to spread to other cafés as well.',
    sourceName: 'Neighborhood News',
    whyComfort:
      'The café reveals that waiting can be a profoundly kind act. The richness of unhurried time stays with the reader.',
    region: 'Japan · Kyushu',
  },
  a20: {
    title: 'An old lighthouse adopts gentle lighting that protects the stars',
    summary:
      'A retired lighthouse switched to lighting that does not wash out the night sky, becoming a favorite place for stargazing.',
    body: 'After years of watching over ships, an old lighthouse completed its original role and changed to gentle lighting that does not interfere with the stars. The fixtures keep light from spilling upward, allowing the darkness of the night sky to return.\n\nThe Milky Way is now clearly visible, and the site has become popular with stargazers. “There is nothing better than lying at the foot of the lighthouse and looking up,” one visitor said.\n\nLocal residents describe it as a change from lighting the sea to protecting the sky.',
    sourceName: 'Night News Notebook',
    whyComfort:
      'The lighthouse continues by changing its purpose. Beneath the stars, there is beauty in something adapting rather than disappearing.',
    region: 'Japan · Hokkaido',
  },
  a21: {
    title: 'Local carpenters build a forest path accessible to wheelchairs',
    summary:
      'Carpenters created a gently sloping wooden path so people using wheelchairs or strollers can enjoy the forest.',
    body: 'A steep forest that had been inaccessible to wheelchair users now has a gently sloping wooden path built by local carpenters. The height of every handrail was carefully adjusted for wheelchair users and children.\n\nThe project began with a wish to share the smell of the forest and the sound of birds with more people. On opening day, someone who had given up visiting the woods took a deep breath at the end of the path.\n\nMuch of the path was built with wood from forest-thinning work, helping maintain the woodland as well.',
    sourceName: 'Bright Tech',
    whyComfort:
      'A wish to share the forest became a path made by hand. Its refusal to leave anyone behind feels deeply kind.',
    region: 'Japan · Chubu',
  },
  a22: {
    title: 'More people learn to repair old instruments and revive forgotten sounds',
    summary:
      'Old instruments that had been sleeping in storehouses are being repaired and played again, attracting quiet interest.',
    body: 'A growing number of people are repairing old instruments that have spent years in storehouses and closets, then playing them again. Repair workshops continue to fill with participants of every generation.\n\nOne person said, “I wanted to bring back the sound of the instrument my grandfather once played.” Some participants now hold small concerts with the instruments they restored.\n\n“The moment an instrument sounds again, it feels as though time reconnects,” an instructor said.',
    sourceName: 'Neighborhood News',
    whyComfort:
      'A sleeping sound returns, connecting the past with the present. It conveys the richness of caring for and inheriting meaningful objects.',
    region: 'Japan · Kansai',
  },
  a23: {
    title: 'Hand-knitted blankets bring warmth to an emergency waiting room at night',
    summary:
      'Volunteers deliver hand-knitted lap blankets for people spending anxious nights in an emergency waiting room.',
    body: 'Local volunteers bring hand-knitted lap blankets to people waiting for long periods in a nighttime emergency department. The colors and patterns vary, and visitors are welcome to take a favorite blanket home.\n\n“On an anxious night, simply having warm knees helped me feel a little calmer,” one recipient said. Many of the knitters once received support at a hospital themselves.\n\nReturned blankets sometimes arrive with handwritten letters of thanks.',
    sourceName: 'Night News Notebook',
    whyComfort:
      'Warmth rests quietly beside people during an anxious night. The circle of passing received kindness onward helps the heart relax.',
    region: 'Japan · Kanto',
  },
  a24: {
    title: 'Children turn ten years of river wildlife observations into a shared map',
    summary:
      'A decade of annual wildlife surveys by local children has become a hand-drawn map treasured by the community.',
    body: 'Local children have continued surveying the living things in their river every year. After ten years, their findings have been assembled into one large map showing where fish and insects were found and how the river changes with the seasons.\n\n“The children who began the project are now university students, and new first graders have taken over,” said a community member who has watched the work continue. The map also quietly shows that the river has become cleaner.\n\nNext year, the group plans to survey the river together with children from a neighboring town.',
    sourceName: 'Northern Forest Journal',
    whyComfort:
      'Children’s patience became a community treasure over ten years. The value of continuing and the river’s recovery make the story especially warm.',
    region: 'Japan · Chugoku',
  },
};

export function localizeArticle(article: Article, locale: Locale): Article {
  if (locale === 'ja') return article;
  const translation = ENGLISH_ARTICLES[article.id];
  return translation ? { ...article, ...translation } : article;
}
