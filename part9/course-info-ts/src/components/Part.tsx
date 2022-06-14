import { PartProps } from '../types'

const Part = ({part}: PartProps) => {

    switch (part.type) {
        case 'normal':
            return (
                <>
                    <h3>{part.name}</h3>
                    <p><b>exerciseCount:</b> {part.exerciseCount}</p>
                    <p><b>description:</b> {part.description}</p>
                </>
            )
        case 'groupProject':
            return (
                <>
                    <h3>{part.name}</h3>
                    <p><b>exerciseCount:</b> {part.exerciseCount}</p>
                    <p>groupProjectCount: {part.groupProjectCount}</p>
                </>
            )
        case 'submission':
            return (
                <> 
                    <h3>{part.name}</h3>
                    <p><b>exerciseCount:</b> {part.exerciseCount}</p>
                    <p><b>description:</b> {part.description}</p>
                    <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
                </>
            )
        case 'special':
            return (
                <>
                    <h3>{part.name}</h3>
                    <p><b>exerciseCount:</b> {part.exerciseCount}</p>
                    <p><b>description:</b> {part.description}</p>
                    <ul>
                        {part.requirements.map((requirement, i) => <li key={i}>{requirement}</li> )}
                    </ul>
                </>
            )
        default:
            return null;
    }
}

export default Part;
