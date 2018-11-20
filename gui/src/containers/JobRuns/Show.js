import React from 'react'
import { connect } from 'react-redux'
import { useHooks, useEffect } from 'use-react-hooks'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PaddedCard from 'components/PaddedCard'
import TimeAgo from 'components/TimeAgo'
import matchRouteAndMapDispatchToProps from 'utils/matchRouteAndMapDispatchToProps'
import { fetchJobRun } from 'actions'
import jobRunSelector from 'selectors/jobRun'
import Content from 'components/Content'
import RegionalNav from 'components/JobRuns/RegionalNav'

const styles = theme => ({
  breadcrumb: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  }
})

const renderDetails = ({fetching, jobRun}) => {
  if (fetching || !jobRun) {
    return <div>Fetching job run...</div>
  }

  return (
    <Grid container spacing={40}>
      <Grid item xs={8}>
        <PaddedCard>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant='subheading' color='textSecondary'>ID</Typography>
              <Typography variant='body1' color='inherit'>
                {jobRun.id}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subheading' color='textSecondary'>Status</Typography>
              <Typography variant='body1' color='inherit'>
                {jobRun.status}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subheading' color='textSecondary'>Created</Typography>
              <Typography variant='body1' color='inherit'>
                <TimeAgo>{jobRun.createdAt}</TimeAgo>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subheading' color='textSecondary'>Result</Typography>
              <Typography variant='body1' color='inherit'>
                {jobRun.result && JSON.stringify(jobRun.result.data)}
              </Typography>
            </Grid>
          </Grid>
        </PaddedCard>
      </Grid>
    </Grid>
  )
}

export const Show = useHooks(props => {
  useEffect(() => { props.fetchJobRun(props.jobRunId) }, [])

  return (<div>
    <RegionalNav
      jobSpecId={props.jobSpecId}
      jobRunId={props.jobRunId}
      jobRun={props.jobRun}
    />

    <Content>
      {renderDetails(props)}
    </Content>
  </div>)
})

const mapStateToProps = (state, ownProps) => {
  const {jobSpecId, jobRunId} = ownProps.match.params
  const jobRun = jobRunSelector(state, jobRunId)
  const fetching = state.jobRuns.fetching

  return {
    jobSpecId,
    jobRunId,
    jobRun,
    fetching
  }
}

export const ConnectedShow = connect(
  mapStateToProps,
  matchRouteAndMapDispatchToProps({fetchJobRun})
)(Show)

export default withStyles(styles)(ConnectedShow)
