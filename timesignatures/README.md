# time:signatures

the goal is to create a website that plays beats that are in the time signature of the current *time*. so 04:04 in the morning plays a steady four-four beat, but something like 16:05 would have to play a beat in a sixteen-five beat. is that even possible?

ideally this isn't even just a metronome, but it has actual computer-generated beats.

## time signature research
lower numeral is the note value that signature is counting. always a power of 2 unless irrational. so 2 is half notes, 4 is quarter notes, 8 eight notes, etc.

upper numeral is how many notes constitutes a bar/measure. a bar divides repeating stress/unstressed beats.

so I think I first choose my BPM.
* there are BPM beats in a minute
* a single beat is 60/BPM seconds long
* a 1/MINUTE note is a beat
* a measure contains HOUR 1/MINUTE notes

### exhaustedly doing basic unit conversion :(
4/4 time signature, 4 BPM
* a measure is four quarter notes per measure (time signature)
* a beat is a quarter note (time signature)
* there are 4 beats in a minute (BPM)
* a single beat is 60 seconds / 4 beats = 15 seconds (BPM)
* a single measure is four beats, 15 times 4 is one minute

3/4 time signature, 100 BPM
* a measure is three quarter notes per measure (time signature)
* a beat is a quarter note (time signature)
* there are 100 beats in a minute
* a single beat is 60 seconds / 100 beats = 0.6 seconds (BPM)
* a measure is 0.6 seconds/beat times 3 beats/measure = 1.8 seconds (BPM + TS)
* a quarter note is a beat (TS denominator), so is 0.6 seconds

## Questions:
WTF do you do on minute 0? divide by 0 error?

ok, but functionally this doesn't use the minute *at all*. this is equivalent to HOUR/4 time, always. I want to make this more interesting

## more research
* divide whole note into MINUTE bits. for 12, you get 8th note triplets (I guess `4*3=12` and 4 is still a nice number in music?). so 8/12, you subdivide into 4 8th note triplets but you only play first 8 8th notes. "1 and a 2 and a 3 and".

4/12: "1 and a 2"
7/12: "1 and a 2 and a 3"
8/12: "1 and a 2 and a 3 and"
^we can transition between X/4, X/8, and X/12 because they still all divide 4. furthermore the 8th note is still getting the beat, right?
^12 employs triplet rhythms, divide by 3
    * triplets split one beat into 3 parts
* if you have something that's a factor of 5, you get quintuplet rhythm
    * if you have 4 quintuplets in 4/4 time, effectively you have 20 1/20th notes

minutes: range from 0 to 59
hours: range from 1 to 12, or 0 to 23

I feel like this is easier to do if the denominator is the hour, not the numerator? bc otherwise your measure is going to get divided into *really* small notes and each measure won't have many of them

irrational time signatures:
* denominator is not a power of 2. mathemetically, it's not a dyadic rational

https://www.youtube.com/watch?v=oBPdjXT3wlY
* 3/4 + 1/3 = 13/12

https://www.youtube.com/watch?v=BG1zZ7K5sf0
* 24 16th notes in a measure of 6/4. 4 16th notes is a quarter note, you have 6 quarter notes per measure, `6*4=24`


let me try to explain metric modulation to myself...
shitty example: If I had a song in 4/4 time at 100BPM, then effectively, I could rewrite that in 4/5 time at 75BPM.
* is that even right? what the fuck?
* so, my reasoning is 4->5 is a jump of 25%. 4/5 time would therefore be 25% *faster* than 4/4 time, but to make it play at the same rate we change the BPM
* ok, no, you're wrong. it is a jump of 25% but remember that 5 is in the denominator, 1/5 < 1/4 (duh?), so 1/5 of 125 BPM is equal to 1/4 of 100

better example: a quarter note at 100BPM is equivalent to an eigth note at 200BPM
*therefore*, a quarter note at 100BPM is equivalent to a 1/7th note at 175BPM
therefore, a quarter note at 100BPM is equivalent to a 1/5th note at 125BPM

so I think I can pick a *base* BPM at 4/4, and then view the minute as a metric modulation, thus "inventing", say, a 1/23 note where one wouldn't exist otherwise. so every minute it gets *faster*. and that's actually a fun effect, because it's more noticable then adding another beep with every hour. I actually really like hour for numerator, minute for denominator, bc you'll only have measures that are 12 (or 24) notes long (which isn't too long to sit through), they're just fast. if we think about irrational time signatures, too, as something that only makes sense in the context of rational time signatures then I think the piece (what a pretentious name for it) justifies itself because it develops over time, starting at 04:04 being the rational beginning.
