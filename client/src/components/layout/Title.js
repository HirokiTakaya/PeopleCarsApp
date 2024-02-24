export const Title = () => {
    const styles = getStyles()
    return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
}

export const PeopleTitle = () => {
    const styles = getStyles()
    return <h1 style={styles.title}>Add Person</h1>
}

export const CarTitle = () => {
    const styles = getStyles()
    return <h1 style={styles.title}>Add Car</h1>
}

export const RecordsTitle = () => {
    const styles = getStyles()
    return <h1 style={styles.title}>Records</h1>
}

const getStyles = () => ({
    title: {
        fontSize: 20,
        padding: '15px',
        marginBottom: '560'
    }
})