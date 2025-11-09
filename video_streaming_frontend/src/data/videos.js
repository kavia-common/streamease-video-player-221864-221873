export const categories = [
  { slug: 'nature', name: 'Nature' },
  { slug: 'space', name: 'Space' },
  { slug: 'animals', name: 'Animals' },
  { slug: 'travel', name: 'Travel' },
  { slug: 'sports', name: 'Sports' },
  { slug: 'tech', name: 'Tech' },
  { slug: 'music', name: 'Music' },
  { slug: 'food', name: 'Food' },
];

let id = 1;
function v({ title, thumbnail, sources, duration = 120, categorySlug, channel = 'StreamEase', views = 12345 }) {
  return { id: id++, title, thumbnail, sources, duration, categorySlug, channel, views };
}

/**
 * Notes on sources:
 * We use CORS-friendly public MP4 assets:
 * - Akamai sample: https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/
 * - Sample-Videos.com CDN mirrors
 * - Archive.org files with CORS
 */
const AK = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample';
const SAMPLE1 = 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4';
const SAMPLE2 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4';

export const videos = [
  v({
    title: 'Big Buck Bunny (Trailer)',
    thumbnail: `${AK}/images/BigBuckBunny.jpg`,
    sources: [`${AK}/BigBuckBunny.mp4`, SAMPLE1, SAMPLE2],
    duration: 596, categorySlug: 'animals'
  }),
  v({
    title: 'Sintel (Trailer)',
    thumbnail: `${AK}/images/Sintel.jpg`,
    sources: [`${AK}/Sintel.mp4`, `${AK}/ElephantsDream.mp4`, SAMPLE1],
    duration: 888, categorySlug: 'tech'
  }),
  v({
    title: 'Tears of Steel (Clip)',
    thumbnail: `${AK}/images/TearsOfSteel.jpg`,
    sources: [`${AK}/TearsOfSteel.mp4`, `${AK}/ForBiggerJoyrides.mp4`, SAMPLE2],
    duration: 734, categorySlug: 'tech'
  }),
  v({
    title: 'For Bigger Blazes',
    thumbnail: `${AK}/images/ForBiggerBlazes.jpg`,
    sources: [`${AK}/ForBiggerBlazes.mp4`, `${AK}/ForBiggerEscapes.mp4`, `${AK}/ForBiggerJoyrides.mp4`],
    duration: 30, categorySlug: 'sports'
  }),
  v({
    title: 'For Bigger Escape',
    thumbnail: `${AK}/images/ForBiggerEscapes.jpg`,
    sources: [`${AK}/ForBiggerEscapes.mp4`, `${AK}/ForBiggerJoyrides.mp4`, `${AK}/ForBiggerFun.mp4`],
    duration: 30, categorySlug: 'travel'
  }),
  v({
    title: 'For Bigger Fun',
    thumbnail: `${AK}/images/ForBiggerFun.jpg`,
    sources: [`${AK}/ForBiggerFun.mp4`, `${AK}/ForBiggerJoyrides.mp4`, `${AK}/ForBiggerEscapes.mp4`],
    duration: 30, categorySlug: 'music'
  }),
  v({
    title: 'For Bigger Joyrides',
    thumbnail: `${AK}/images/ForBiggerJoyrides.jpg`,
    sources: [`${AK}/ForBiggerJoyrides.mp4`, `${AK}/ForBiggerFun.mp4`, `${AK}/ForBiggerEscapes.mp4`],
    duration: 30, categorySlug: 'travel'
  }),
  v({
    title: 'For Bigger Meltdowns',
    thumbnail: `${AK}/images/ForBiggerMeltdowns.jpg`,
    sources: [`${AK}/ForBiggerMeltdowns.mp4`, `${AK}/ForBiggerJoyrides.mp4`, `${AK}/ForBiggerFun.mp4`],
    duration: 30, categorySlug: 'tech'
  }),
  v({
    title: 'Subaru Outback On Street And Dirt',
    thumbnail: `${AK}/images/SubaruOutbackOnStreetAndDirt.jpg`,
    sources: [`${AK}/SubaruOutbackOnStreetAndDirt.mp4`, `${AK}/WeAreGoingOnBullrun.mp4`],
    duration: 60, categorySlug: 'travel'
  }),
  v({
    title: 'We Are Going On Bullrun',
    thumbnail: `${AK}/images/WeAreGoingOnBullrun.jpg`,
    sources: [`${AK}/WeAreGoingOnBullrun.mp4`, `${AK}/ForBiggerJoyrides.mp4`],
    duration: 60, categorySlug: 'sports'
  }),
  v({
    title: 'What care can do',
    thumbnail: `${AK}/images/WhatCarCanYouGetForAGrand.jpg`,
    sources: [`${AK}/WhatCarCanYouGetForAGrand.mp4`, `${AK}/SubaruOutbackOnStreetAndDirt.mp4`],
    duration: 60, categorySlug: 'tech'
  }),
  v({
    title: 'Volkswagen GTI Review',
    thumbnail: `${AK}/images/VolkswagenGTIReview.jpg`,
    sources: [`${AK}/VolkswagenGTIReview.mp4`, `${AK}/WeAreGoingOnBullrun.mp4`],
    duration: 60, categorySlug: 'tech'
  }),
  v({
    title: 'Over the Horizon',
    thumbnail: `${AK}/images/OverTheHorizon.jpg`,
    sources: [`${AK}/OverTheHorizon.mp4`, `${AK}/ForBiggerJoyrides.mp4`],
    duration: 120, categorySlug: 'travel'
  }),
  v({
    title: 'For The Birds',
    thumbnail: `${AK}/images/ForTheBirds.jpg`,
    sources: [`${AK}/ForTheBirds.mp4`, `${AK}/BigBuckBunny.mp4`],
    duration: 120, categorySlug: 'animals'
  }),
  v({
    title: 'Cristina',
    thumbnail: `${AK}/images/Cristina.jpg`,
    sources: [`${AK}/Cristina.mp4`, `${AK}/Sintel.mp4`],
    duration: 120, categorySlug: 'music'
  }),
  v({
    title: 'Iceland',
    thumbnail: `${AK}/images/Iceland.jpg`,
    sources: [`${AK}/Iceland.mp4`, `${AK}/SubaruOutbackOnStreetAndDirt.mp4`],
    duration: 120, categorySlug: 'nature'
  }),
  v({
    title: 'Google I/O 2014 Demo',
    thumbnail: `${AK}/images/IO2014.jpg`,
    sources: [`${AK}/IO2014.mp4`, `${AK}/TearsOfSteel.mp4`],
    duration: 120, categorySlug: 'tech'
  }),
  v({
    title: 'HD',
    thumbnail: `${AK}/images/Hd.jpg`,
    sources: [`${AK}/Hd.mp4`, `${AK}/TearsOfSteel.mp4`],
    duration: 120, categorySlug: 'tech'
  }),
  v({
    title: 'For Bigger Escape 2',
    thumbnail: `${AK}/images/ForBiggerEscapes.jpg`,
    sources: [`${AK}/ForBiggerEscapes.mp4`, `${AK}/ForBiggerBlazes.mp4`],
    duration: 30, categorySlug: 'sports'
  }),
  v({
    title: 'Bunny Clip 10s',
    thumbnail: `${AK}/images/BigBuckBunny.jpg`,
    sources: [SAMPLE2, SAMPLE1, `${AK}/BigBuckBunny.mp4`],
    duration: 10, categorySlug: 'animals'
  }),
  v({
    title: 'Elephants Dream',
    thumbnail: `${AK}/images/ElephantsDream.jpg`,
    sources: [`${AK}/ElephantsDream.mp4`, `${AK}/Sintel.mp4`, SAMPLE1],
    duration: 653, categorySlug: 'tech'
  }),
  v({
    title: 'For Bigger Joyrides 2',
    thumbnail: `${AK}/images/ForBiggerJoyrides.jpg`,
    sources: [`${AK}/ForBiggerJoyrides.mp4`, `${AK}/ForBiggerFun.mp4`],
    duration: 30, categorySlug: 'travel'
  }),
  v({
    title: 'For Bigger Meltdowns 2',
    thumbnail: `${AK}/images/ForBiggerMeltdowns.jpg`,
    sources: [`${AK}/ForBiggerMeltdowns.mp4`, `${AK}/ForBiggerEscapes.mp4`],
    duration: 30, categorySlug: 'tech'
  }),
  v({
    title: 'For Bigger Blazes 2',
    thumbnail: `${AK}/images/ForBiggerBlazes.jpg`,
    sources: [`${AK}/ForBiggerBlazes.mp4`, `${AK}/ForBiggerFun.mp4`],
    duration: 30, categorySlug: 'sports'
  }),
  v({
    title: 'For The Birds 2',
    thumbnail: `${AK}/images/ForTheBirds.jpg`,
    sources: [`${AK}/ForTheBirds.mp4`, `${AK}/BigBuckBunny.mp4`],
    duration: 120, categorySlug: 'animals'
  }),
  v({
    title: 'Iceland 2',
    thumbnail: `${AK}/images/Iceland.jpg`,
    sources: [`${AK}/Iceland.mp4`, `${AK}/OverTheHorizon.mp4`],
    duration: 120, categorySlug: 'nature'
  }),
  v({
    title: 'Cristina 2',
    thumbnail: `${AK}/images/Cristina.jpg`,
    sources: [`${AK}/Cristina.mp4`, `${AK}/Hd.mp4`],
    duration: 120, categorySlug: 'music'
  }),
  v({
    title: 'Subaru Dirt 2',
    thumbnail: `${AK}/images/SubaruOutbackOnStreetAndDirt.jpg`,
    sources: [`${AK}/SubaruOutbackOnStreetAndDirt.mp4`, `${AK}/WeAreGoingOnBullrun.mp4`],
    duration: 60, categorySlug: 'travel'
  }),
  v({
    title: 'Over the Horizon 2',
    thumbnail: `${AK}/images/OverTheHorizon.jpg`,
    sources: [`${AK}/OverTheHorizon.mp4`, `${AK}/ForBiggerEscapes.mp4`],
    duration: 120, categorySlug: 'travel'
  }),
  v({
    title: 'Volkswagen GTI Review 2',
    thumbnail: `${AK}/images/VolkswagenGTIReview.jpg`,
    sources: [`${AK}/VolkswagenGTIReview.mp4`, `${AK}/IO2014.mp4`],
    duration: 60, categorySlug: 'tech'
  }),
  v({
    title: 'Sintel 2',
    thumbnail: `${AK}/images/Sintel.jpg`,
    sources: [`${AK}/Sintel.mp4`, `${AK}/TearsOfSteel.mp4`],
    duration: 888, categorySlug: 'tech'
  }),
  v({
    title: 'Tears of Steel 2',
    thumbnail: `${AK}/images/TearsOfSteel.jpg`,
    sources: [`${AK}/TearsOfSteel.mp4`, `${AK}/Sintel.mp4`],
    duration: 734, categorySlug: 'tech'
  }),
  v({
    title: 'Big Buck Bunny 2',
    thumbnail: `${AK}/images/BigBuckBunny.jpg`,
    sources: [`${AK}/BigBuckBunny.mp4`, `${AK}/ForTheBirds.mp4`],
    duration: 596, categorySlug: 'animals'
  }),
];

export default videos;
